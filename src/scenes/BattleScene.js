//TODO: Get it as an exercise to save the state of the player characters and to make them get experience and levels. Also you can add more actions to the Actions menu and pass them together with the events.
//TODO: change battles to onscreen interaction. no such thing as a battle scene anymore due to Index issues. Create a bar with collision counting with weapon vs enemy via clicks or keypress. have enemies drop random items. then introduce fear as a concept that can debilitate character into running back home or hiding or something. battle implementation is still in progress for storing data. 

import 'phaser';


export class BattleScene extends Phaser.Scene {
    constructor(){
        super('Battle');
    }

    create(){
        // battle background 
        this.titlebg = this.add.tileSprite(0,0,this.cameras.main.width, this.cameras.main.height, "title_bg");
        this.titlebg.setOrigin(0,0);

        this.startBattle();

        // on wake event we call startBattle too
        this.sys.events.on('wake', this.startBattle, this);
    }
    //! -- FUNCTIONS
    startBattle(){
        // players character Fin
        var player = new PlayerCharacter(this, 500, 100, 'player', 10, 'Fin', 100, 20);
        this.add.existing(player);
        // player character - Dexter
        var neighbor = new PlayerCharacter(this, 500, 300, 'neighbor', 10, 'Dexter', 80, 8)
        this.add.existing(neighbor);
        //player character - Violet
        var friend = new PlayerCharacter(this, 600, 200, 'friend', 10, 'Violet', 80, 8)
        this.add.existing(friend);

        // enemy
        var mosquito = new Enemy(this, 200, 100, 'mosquito', 7, 'Enemy1', 50, 3);
        this.add.existing(mosquito);
        var snake = new Enemy(this, 200, 250, 'snake', 4, 'Enemy2', 75, 5);
        this.add.existing(snake);
        var bat = new Enemy(this, 200, 350, 'bat', 3, 'Enemy3', 75, 5);
        this.add.existing(bat);
        var cloakedFigure = new Enemy(this, 75, 250, 'cloakedfigure', 2, 'Enemy4', 100, 7);
        this.add.existing(cloakedFigure);

        //array with heroes
        this.heroes = [ player, neighbor];
        //array with enemies
        this.enemies = [ mosquito, snake, bat, cloakedFigure ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);

        //run UI scene at the same time
        this.scene.run('UI');
    }
    exitBattle(){
        this.scene.sleep('UI');
        this.scene.switch('Game');
    }
    wake(){
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
    }
    nextTurn(){
        //if we have victory or gameover
        if(this.checkEndBattle()){
            this.endBattle();
            return;
        }
        do {
            //currently active unit
            this.index++;
            //if there are no more units, we start again from the first one
            if(this.index >= this.units.length){
                this.index = 0;
            }
        } while(!this.units[this.index].living);
        //if its player hero
        if(this.units[this.index] instanceof PlayerCharacter){
            //we need the player to select action and then enemy
            this.events.emit('PlayerSelect', this.index);
        } else { // else if it's enemy unit
            //pick random living hero to be attacked
            var r;
            do {
                r = Math.floor(Math.random() * this.heroes.length);
            } while (!this.heroes[r].living)
            //call the enemy's attack function
            this.units[this.index].attack(this.heroes[r]);
            //add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    }
    receivePlayerSelection(action, target){
        if(action == 'attack') {
            this.units[this.index].attack(this.enemies[target]);
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this});
    }
    checkEndBattle(){
        var victory = true;
        //if all enemies are dead we have a victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        //if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++){
            if(this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    }
    endBattle(){
        //clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for(var i = 0; i < this.units.length; i++){
            //link item
            this.units[i].destroy();
        }
        this.units.length = 0;
        //sleep the UI
        this.scene.sleep('UIScene');
        //return to GameScene and sleep current BattleScene
        this.scene.switch('Game');
    }

}

//! -------------------------------
//! --- FOR USE IN BATTLE SCENE ---
//! -------------------------------

class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super (scene, x, y, texture, frame);
        this.type = type;
        this.maxHP = this.hp = hp;
        this.damage = damage; //default damage
        this.living = true;
        this.menuItem = null;
    }
    //! FUNCTIONS
    //we will use this to notify the menu item when the unit is dead
    setMenuItem(item){
        this.menuItem = item;
    }
    //attack the target unit
    attack(target){
        if(target.living){
            target.takeDamage(this.damage);
            this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
        }
    }
    takeDamage(damage){
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.menuItem.unitKilled();
            this.living = false;
            this.visible = false;
            this.menuItem = null;
        }
    }
}
  
class Enemy extends Unit {
constructor(scene, x, y, texture, frame, type, hp, damage) {
    super (scene, x, y, texture, frame, type, hp, damage);
    this.setScale(2);
}
} 
  
class PlayerCharacter extends Unit {
constructor(scene, x, y, texture, frame, type, hp, damage) {
    super (scene, x, y, texture, frame, type, hp, damage);
    this.setScale(2);
}
}

//!--------------------------------------------------------
//!---------------------- UI SCENE ------------------------
//!--------------------------------------------------------

export class UIScene extends Phaser.Scene {
    constructor(){
        super({ key: 'UI'});
    }
    create(){
        // draw some background for the menu
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(5, 0xffffff);
        this.graphics.fillStyle(0x011627, 1);     
        this.graphics.strokeRect(50, 450, 200, 140);
        this.graphics.fillRect(50, 450, 200, 140);
        this.graphics.strokeRect(275, 450, 200, 140);
        this.graphics.fillRect(275, 450, 200, 140);
        this.graphics.strokeRect(500, 450, 250, 140);
        this.graphics.fillRect(500, 450, 250, 140);

        //basic container to hold all menus
        this.menus = this.add.container();

        this.heroesMenu = new HeroesMenu(507, 453, this);
        this.actionsMenu = new ActionsMenu(280, 453, this);
        this.enemiesMenu = new EnemiesMenu(56, 453, this);

        //the currently selected menu
        this.currentMenu = this.actionsMenu;

        //add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get('Battle');

        //listen for keyboard events
        this.input.keyboard.on('keydown', this.onKeyInput, this);

        //when its player unit turn to move
        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        //when the action on the menu is selected
        //for now we only have one action so we dont send an action id
        this.events.on("SelectedAction", this.onSelectedAction, this);

        //an enemy is selected
        this.events.on("Enemy", this.onEnemy, this);

        //when the scene receives wake event
        this.sys.events.on('wake', this.createMenu, this);

        //the message describing the current action
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        this.createMenu();
    }

    //!-- FUNCTIONS
    createMenu(){
        //map hero menu items to heroes
        this.remapHeroes();
        //map enemies menu items to enemies
        this.remapEnemies();
        // first move
        this.battleScene.nextTurn();
    }
    remapHeroes(){
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    }
    remapEnemies(){
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    }

    onKeyInput(event){
        if(this.currentMenu && this.currentMenu.selected){
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "ArrowRight" || event.code === "Shift") {
            } else if(event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            }
        }
    }
    onPlayerSelect(id){
        this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }
    onSelectedAction(){
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }
    onEnemy(){
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack'); //! changed index to target
    }

}

//! -------------------------------
//! ----- FOR USE IN UI SCENE -----
//! -------------------------------

class MenuItem extends Phaser.GameObjects.Text {
    constructor(x, y, text, scene){
        super(scene, x, y, text, { color: '#fff', align: 'left', fontSize: 20});
    }
    
    //! FUNCTIONS
    select(){
        this.setColor('#f8ff38');
    }
    deselect(){
        this.setColor('#fff');
    }
    // when the associated enemy or player unit is killed
    unitKilled(){
        this.active = false;
        this.visible = false;
    }
}
    
class Menu extends Phaser.GameObjects.Container {
    constructor(x, y, scene, heroes){
        super(scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.x = x;
        this.y = y;
        this.selected = false;
    }
    //! FUNCTIONS
    addMenuItem(unit){
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);
        return menuItem;
    }
    moveSelectionUp(){
        this.menuItems[this.menuItemIndex].deselect();
        do {
            this.menuItemsIndex--;
            if(this.menuItemIndex < 0)
                this.menuItemIndex = this.menuItems.length - 1;
        } while (!this.menuItems[this.menuItemIndex].active);
        this.menuItems[this.menuItemIndex].select();
    }
    moveSelectionDown(){
        this.menuItems[this.menuItemIndex].deselect();
        do {
            this.menuItemsIndex++;
            if(this.menuItemIndex >= this.menuItems.length)
                this.menuItemIndex = 0;
        } while (!this.menuItems[this.menuItemIndex].active);
        this.menuItems[this.menuItemIndex].select();
    }
    //select menu as a whole and highlight the chosen element
    select(index){
        if(!index)
            this.index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        while(!this.menuItems[this.menuItemIndex].active) {
            this.menuItemIndex++;
            if(this.menuItemIndex >= this.menuItems.length)
                this.menuItemIndex = 0;
            if(this.menuItemIndex == index)
                return;
        }
        this.menuItems[this.menuItemIndex].select();
        this.selected = true;
    }
    // deselect menu
    deselect(){
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
        this.selected = false;
    }
    confirm(){
        // when player confirms his selection, do the action
    }
    // clear the menu and remove all the menu items
    clear(){
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }
    //recreate the menu items
    remap(units){
        this.clear();
        for(var i = 0; i < units.length; i++){
            var unit = units[i];
            unit.setMenuItem(this.addMenuItem(unit.type));
        }
        this.menuItemIndex = 0;
    }
}

class HeroesMenu extends Menu {
    constructor(x, y, scene) {
        super(x, y, scene);
    }
}

class ActionsMenu extends Menu {
    constructor(x, y, scene){
        super(x, y, scene);
        this.addMenuItem('Attack');
    }
    confirm(){
        //do something when the player selects an action
        this.scene.events.emit('SelectedAction');
    }
}

class EnemiesMenu extends Menu {
    constructor(x, y, scene){
        super(x, y, scene);
    }
    confirm(){
        //do something when the player selects an enemy
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
}

class Message extends Phaser.GameObjects.Container {
    constructor(scene, events){
        super(scene, 160, 30);
        var graphics = this.scene.add.graphics();
        this.add(graphics);
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);        
        graphics.strokeRect(-90, -15, 180, 30);
        graphics.fillRect(-90, -15, 180, 30);
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 160, useAdvancedWrap: true }});
        this.add(this.text);
        this.text.setOrigin(0.5);        
        events.on("Message", this.showMessage, this);
        this.visible = false;
    }
    showMessage(text){
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent)
            this.hideEvent.remove(false);
        this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
    }
    hideMessage(){
        this.hideEvent = null;
        this.visible = false;
    }
}






