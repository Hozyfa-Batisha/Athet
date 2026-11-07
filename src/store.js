'use strict';
// تخزين JSON في DATA_DIR. الكتابة "ذرّية": نكتب ملف مؤقت وبعدين rename،
// فلو السيرفر وقع وسط الكتابة الملف القديم يفضل سليم (بدل ملف بايظ نصه فاضي).
const fs = require('fs');
const path = require('path');
const { DATA_DIR } = require('./config');

fs.mkdirSync(DATA_DIR, { recursive: true });

const file = name => {
  const p = path.join(DATA_DIR, path.basename(name)); // basename = مفيش ../ ممكن تهرب من المجلد
  return p;
};

function readJson(name, fallback) {
  try { return JSON.parse(fs.readFileSync(file(name), 'utf8')); } catch { return fallback; }
}

function readRaw(name, fallback) {
  try { return fs.readFileSync(file(name), 'utf8'); } catch { return fallback; }
}

function writeRaw(name, text) {
  const target = file(name);
  const tmp = target + '.' + process.pid + '.' + Date.now() + '.tmp';
  fs.writeFileSync(tmp, text, { mode: 0o600 });
  fs.renameSync(tmp, target);
}

const writeJson = (name, obj) => writeRaw(name, JSON.stringify(obj));
const exists = name => fs.existsSync(file(name));

module.exports = { readJson, readRaw, writeRaw, writeJson, exists, file };
