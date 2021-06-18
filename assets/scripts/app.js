// Good habit: Use Capital letters for naming global const variables
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 18;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 12;

const LOG_EVENT_PLAYER_ATTACK = "PLAYER ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER STRONG ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER HEALED";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER ATTACK";
const LOG_EVENT_GAME_OVER = "GAME OVER";

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonousLife = true;
let battleLog = [];

const userName = prompt('Enter your name', '')
// Set max value of health bar
adjustHealthBars(chosenMaxLife);

function writeToLog(_event, _value, _playerHealth, _monsterHealth) {
  let logEntry;

  /* USING SWITCH CASE */
  switch (_event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry = {
        event: _event,
        damage: _value,
        target: "MONSTER",
        playerHealth: _playerHealth,
        monsterHealth: _monsterHealth,
      };
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: _event,
        damage: _value,
        target: "MONSTER",
        playerHealth: _playerHealth,
        monsterHealth: _monsterHealth,
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: _event,
        value: _value,
        playerHealth: _playerHealth,
        monsterHealth: _monsterHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: _event,
        damage: _value,
        target: "PLAYER",
        playerHealth: _playerHealth,
        monsterHealth: _monsterHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: _event,
        result: _value,
        playerHealth: _playerHealth,
        monsterHealth: _monsterHealth,
      };
      break;
    default:
      logEntry = {};
  }

  /* USING IF-ELSE
  if (_event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: _event,
      damage: _value,
      target: "MONSTER",
      playerHealth: _playerHealth,
      monsterHealth: _monsterHealth,
    };
  } else if (_event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: _event,
      damage: _value,
      target: "MONSTER",
      playerHealth: _playerHealth,
      monsterHealth: _monsterHealth,
    };
  } else if (_event === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: _event,
      value: _value,
      playerHealth: _playerHealth,
      monsterHealth: _monsterHealth,
    };
  } else if (_event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      
      h,
      monsterHealth: _monsterHealth,
    };
  } else if (_event === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: _event,
      result: _value,
      playerHealth: _playerHealth,
      monsterHealth: _monsterHealth,
    };
  }*/

  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  //Monster attacking Player
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    MONSTER_ATTACK_VALUE,
    currentPlayerHealth,
    currentMonsterHealth
  );

  if (currentPlayerHealth <= 0 && hasBonousLife) {
    hasBonousLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert("Bonous Life activated");
    setPlayerHealth(initialPlayerHealth);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("YOU WON !");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentPlayerHealth,
      currentMonsterHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("YOU LOST !");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      currentPlayerHealth,
      currentMonsterHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("MATCH DRAWN !");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MATCH DRAWN",
      currentPlayerHealth,
      currentMonsterHealth
    );
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attack(mode) {
  let maxAttackValue;
  let logEvent;

  if (mode === "ATTACK") {
    maxAttackValue = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === "STRONG ATTACK") {
    maxAttackValue = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  //Player attacking Monster
  const monsterDamage = dealMonsterDamage(maxAttackValue);
  currentMonsterHealth -= monsterDamage;
  writeToLog(
    logEvent,
    maxAttackValue,
    currentPlayerHealth,
    currentMonsterHealth
  );
  endRound();
}

function attackHandler() {
  attack("ATTACK");
}

function strongAttackHandler() {
  attack("STRONG ATTACK");
}

function healHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
    alert("Max health achieved");
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentPlayerHealth,
    currentMonsterHealth
  );
  endRound();
}

function displayLog() {
  console.log(battleLog);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", displayLog);
