### USER
Как отключить в VS-код синхронизацию между исходным кодом HTML и превью панелью? Я хочу, чтобы когда я скролю HTML код, превью панели оставалась на том же месте. 

### ASSISTANT
В VS Code эта функция называется «Sync Preview» (Синхронизация превью). Чтобы отключить синхронизацию прокрутки между редактором кода и панелью предварительного просмотра, выполните следующие действия:

1.  Откройте **Настройки** (Settings):
    *   Нажмите `Ctrl + ,` (или `Cmd + ,` на macOS).
    *   Либо через меню: `File` > `Preferences` > `Settings`.
2.  В строке поиска настроек введите: `markdown.preview.scrollPreviewWithEditor`.
    *   *Примечание:* Даже если вы работаете с чистым HTML, эта настройка часто контролирует поведение встроенного превью или расширений для предпросмотра HTML, использующих движок Markdown/WebView.
3.  **Снимите галочку** с пункта **Markdown > Preview: Scroll Preview With Editor**.

Если вы используете конкретное расширение для просмотра HTML (например, "Live Preview" от Microsoft или "HTML Preview"), проверьте его индивидуальные настройки:
1.  В поиске настроек введите имя расширения (например, `live preview`).
2.  Найдите опцию, содержащую слова `scroll`, `sync` или `link`, и отключите её.

После этого при прокрутке кода панель превью будет оставаться на месте, пока вы не начнете скроллить её саму.

### USER
У меня не Markdown. У меня HTML. 

### ASSISTANT
Понял. Поскольку вы работаете именно с **HTML**, а не с Markdown, стандартная настройка `markdown.preview.scrollPreviewWithEditor` действительно не подойдет.

Поведение синхронизации прокрутки в VS Code для HTML зависит от того, **какое именно расширение** вы используете для превью. В самом VS Code нет встроенной панели «HTML Preview» с синхронизацией по умолчанию (в отличие от Markdown). Скорее всего, у вас установлено одно из популярных расширений.

Вот решения для самых распространенных сценариев:

### 1. Если вы используете расширение **«Live Preview»** (от Microsoft)
Это официальное расширение, которое часто ведет себя как встроенное.
1. Откройте настройки (`Ctrl + ,`).
2. В поиске введите: `live preview scroll`.
3. Найдите опцию **Live Preview > Scroll Sync** (или похожую, например `Sync Scrolling`).
4. **Снимите галочку**.

*Альтернативный способ через `settings.json`:*
Добавьте или измените следующую строку в вашем `settings.json`:
```json
"ms-vscode.live-preview.scrollSync": false
```

### 2. Если вы используете расширение **«HTML Preview»** (например, от Simon Siefke или другие аналоги)
Многие легкие просмотрщики HTML имеют свою собственную настройку.
1. В поиске настроек введите имя расширения, например: `html preview`.
2. Ищите опции вида:
   - `HTML Preview: Sync Scrolling`
   - `HTML Preview: Auto Refresh` (иногда синхронизация привязана к обновлению)
   - `Scroll With Editor`
3. Отключите найденную опцию.

### 3. Если вы используете **«Live Server»** (Ritwick Dey)
**Важно:** Расширение *Live Server* открывает предпросмотр в **вашем внешнем браузере** (Chrome, Firefox и т.д.), а не внутри панели VS Code.
- В этом случае синхронизация прокрутки между редактором и браузером **невозможна** по умолчанию и не управляется настройками VS Code, так как это разные приложения.
- Если у вас синхронизация есть, значит, вы используете какое-то другое расширение, отображающее превью *внутри* вкладки VS Code.

### Как точно найти нужную настройку, если не знаете название расширения:
1. Посмотрите на заголовок вкладки с превью. Там обычно написано название расширения (например, `Preview: index.html [Live Preview]`).
2. В настройках VS Code (`Ctrl + ,`) введите в поиск ключевое слово `scroll`.
3. Просмотрите список результатов. Все настройки, относящиеся к синхронизации, будут содержать слова `sync`, `scroll` и название вашего расширения. Отключите ту, что относится к вашему инструменту просмотра HTML.

Если вы напишете точное название расширения, которое отображает превью, я дам конкретную команду для `settings.json`.

### USER
```
    "markdown.preview.scrollEditorWithPreview": false,
    "html.preview.scrollEditorWithPreview": false,
    "html.preview.scrollPreviewWithEditor": false
```
Мне помогли вот эти настройки, а могу я как-то это менять с помощью короткой клавиши или какого-то быстрое переключения без того, чтобы ходить постоянно в настройку. То есть, чтобы это переключение между скранируемся и не скранируемся было временным, а не постоянным. 

### ASSISTANT
Да, вы можете создать переключатель (toggle) для этих настроек с помощью горячей клавиши. В VS Code нет встроенной команды «переключить синхронизацию превью», но это легко реализуется через макрос или небольшое расширение.

Учитывая вашу техническую подкованность и предпочтение к скриптам без лишних зависимостей, вот два лучших способа:

### Способ 1: Использование расширения «Macro Commander» (Рекомендуемый)
Это самый надежный способ, так как он позволяет выполнять последовательность команд (чтение настройки -> инверсия -> запись) одной кнопкой.

1.  Установите расширение **Macro Commander** (автор: *geddski* или аналогичное, например, *multi-command*).
2.  Откройте `settings.json` и добавьте конфигурацию макроса:

```json
"macroCommands": [
    {
        "name": "toggleHtmlPreviewSync",
        "commands": [
            {
                "command": "extension.multiCommand.execute",
                "args": {
                    "sequence": [
                        {
                            "command": "workbench.action.openSettingsJson"
                        },
                        {
                            "command": "editor.action.findNext",
                            "args": {
                                "searchString": "html.preview.scrollPreviewWithEditor"
                            }
                        },
                        {
                            "command": "workbench.action.closeActiveEditor"
                        },
                        {
                            "command": "workbench.action.toggleSetting",
                            "args": {
                                "key": "html.preview.scrollPreviewWithEditor",
                                "value": true
                            }
                        },
                         {
                            "command": "workbench.action.toggleSetting",
                            "args": {
                                "key": "markdown.preview.scrollPreviewWithEditor",
                                "value": true
                            }
                        }
                    ]
                }
            }
        ]
    }
]
```
*Примечание:* Прямое переключение булевых значений через стандартные команды VS Code ограничено. Для полноценного toggling (true/false) лучше использовать расширение **Multi Command**.

**Более простой вариант с расширением "Multi Command":**
1. Установите расширение **Multi Command** (автор: *ryuta46*).
2. Добавьте в `settings.json`:

```json
"multiCommand.commands": [
    {
        "command": "multiCommand.toggleHtmlSync",
        "sequence": [
            {
                "command": "workbench.action.openSettingsJson"
            },
            {
                "command": "editor.action.commentLine" 
            },
            {
                "command": "workbench.action.closeActiveEditor"
            }
        ]
    }
]
```
*Этот метод слишком грубый (комментирует строки).*

**Идеальное решение для вашего случая (без сложных макросов):**
Поскольку нативная поддержка динамического переключения конкретных настроек через одну команду в VS Code ограничена без написания своего расширения, самый быстрый и «чистый» способ для продвинутого пользователя — использовать **сниппет настроек** или **профили**, но это не «одно нажатие».

Однако, есть обходной путь через **User Snippets для settings.json** или использование команды `workbench.action.openSettings` с фильтром, но это не переключает значение.

**Лучшее рабочее решение (через расширение "Toggle Setting"):**
Существует расширение, созданное именно для этого: **Toggle Setting** (или аналогичные, например, *Settings Toggle*).
Но если вы хотите сделать это **без установки лишних расширений**, используя только встроенные возможности и ваш навык scripting:

#### Вариант А: Быстрый доступ через палитру команд (без макроса)
Вы можете создать задачу (Task), которая меняет файл `settings.json`, и привязать её к хоткею, но это перезагружает окно.

#### Вариант Б: Использование расширения "Keybindings JSON" + Макрос (Самый гибкий)
Я рекомендую установить легкое расширение **Multi Command** (оно очень популярно и надежно). Вот точная конфигурация для переключения именно ваших трех настроек:

1.  Установите **Multi Command**.
2.  В `settings.json` добавьте:

```json
"multiCommand.commands": [
    {
        "command": "multiCommand.toggleScrollSync",
        "sequence": [
            {
                "command": "workbench.action.openSettingsJson"
            },
            {
                "command": "editor.action.findNext",
                "args": {
                    "searchString": "\"html.preview.scrollPreviewWithEditor\": false"
                }
            },
            {
                "command": "editor.action.deleteLines"
            },
            {
                "command": "editor.action.insertLineAfter",
                "args": {
                    "text": "    \"html.preview.scrollPreviewWithEditor\": true,"
                }
            },
            {
                "command": "workbench.action.closeActiveEditor"
            }
        ]
    }
]
```
*Этот подход хрупок, так как зависит от форматирования файла.*

---

### ✅ Лучшее решение для вас (Профессиональный подход)

Так как вы цените надежность и отсутствие лишнего софта, а нативный API VS Code не дает простой команды `toggleSetting` для произвольных ключей без кода, я предлагаю использовать **Profile Switching** (Профили), если у вас VS Code версии 1.70+. Это встроенная функция.

1.  Создайте профиль **"Dev No Sync"**:
    *   Нажмите `Ctrl+Shift+P` -> `Profiles: Create Profile...`
    *   Назовите его `NoScrollSync`.
    *   В настройках этого профиля установите ваши три параметра в `false`.
2.  Создайте профиль **"Dev Sync"** (или используйте Default):
    *   Установите эти параметры в `true` (или удалите их, чтобы было по умолчанию).
3.  Привяжите горячие клавиши к переключению профилей:
    *   Откройте `keybindings.json` (`Ctrl+Shift+P` -> `Preferences: Open Keyboard Shortcuts (JSON)`).
    *   Добавьте:

```json
[
    {
        "key": "ctrl+alt+s", 
        "command": "workbench.profiles.actions.switchProfile",
        "args": { "profileName": "NoScrollSync" }
    },
    {
        "key": "ctrl+alt+d", 
        "command": "workbench.profiles.actions.switchProfile",
        "args": { "profileName": "Default" } 
    }
]
```

**Преимущества этого метода:**
*   Не требует сторонних расширений.
*   Мгновенное переключение состояний (включено/выключено).
*   Надежно и стабильно (использует нативный механизм VS Code).
*   Вы можете дать профилям имена вроде "Focus Mode" (без скролла) и "Edit Mode" (со скроллом).

Если вам критично именно **одно** сочетание клавиш для переключения туда-сюда (toggle), то без написания собственного JS-расширения или использования расширения типа **"Simple Toggle Settings"** (которое делает ровно это: binds a key to toggle a specific setting value) не обойтись.

**Рекомендация:** Установите расширение **Simple Toggle Settings** (или аналог с высоким рейтингом, например, *Toggle Setting Value*).
После установки добавьте в `keybindings.json`:

```json
[
    {
        "key": "ctrl+shift+s",
        "command": "toggleSettingValue.toggle",
        "args": {
            "key": "html.preview.scrollPreviewWithEditor",
            "trueValue": false,
            "falseValue": true
        }
    },
    {
        "key": "ctrl+shift+s",
        "command": "toggleSettingValue.toggle",
        "args": {
            "key": "markdown.preview.scrollPreviewWithEditor",
            "trueValue": false,
            "falseValue": true
        },
        "when": "false" 
    }
]
```
*(Примечание: Вам нужно будет настроить расширение так, чтобы оно переключало все три ключа по очереди или использовало его мульти-настройки, если расширение это поддерживает. Большинство таких расширений позволяют указать список ключей).*

**Итог:** Самый чистый и встроенный способ — **Профили (Profiles)**. Самый гибкий "одной кнопкой" — расширение **Simple Toggle Settings**.

### USER
Очень много разрозненных рекомендаций. В верхнем правом углу окошек внутри редактора кода я вижу три точки и надпись More Actions. При нажатии на эти три точки выпадающее меню появляется. Я бы хотел добавить в это выпадающее меню команду, которая делает работу, о которой я описал. 

### ASSISTANT
Чтобы добавить команду переключения синхронизации прямо в меню **«Three Dots» (More Actions)** внутри панели превью, вам потребуется создать небольшое кастомное расширение. Встроенными средствами VS Code (через `settings.json` или `keybindings.json`) добавить пункт в контекстное меню конкретного WebView-контейнера нельзя.

Учитывая ваш опыт работы с контейнерами и скриптами, вот готовое, минималистичное решение на Python/Node (но для расширения VS Code нужен **TypeScript/JavaScript**). Я напишу код расширения, которое делает ровно одну вещь: добавляет пункт меню «Toggle Scroll Sync», переключающий ваши три настройки.

### План действий
1. Создать папку расширения.
2. Вставить код (манифест + логика).
3. Упаковать и установить (или запустить в режиме отладки).

#### 1. Структура файлов
Создайте папку `toggle-scroll-sync` и внутри неё два файла:
- `package.json`
- `extension.js`

#### 2. Файл `package.json`
Этот файл регистрирует команду и привязывает её к меню заголовка веб-панели (`webview/title`).

```json
{
  "name": "toggle-scroll-sync",
  "displayName": "Toggle Scroll Sync",
  "version": "1.0.0",
  "engines": {
    "vscode": "^1.80.0"
  },
  "activationEvents": [],
  "main": "./extension.js",
  "contributes": {
    "commands": [
      {
        "command": "toggleScrollSync.toggle",
        "title": "Toggle Scroll Sync",
        "category": "Preview"
      }
    ],
    "menus": {
      "webview/title": [
        {
          "command": "toggleScrollSync.toggle",
          "when": "webviewId =~ /.*preview.*/ || webviewId =~ /.*html.*/",
          "group": "navigation"
        }
      ]
    }
  }
}
```
*Примечание:* Условие `when` пытается поймать окна превью. Если ваше расширение использует специфический `webviewId`, возможно, придется его уточнить (можно оставить универсальным, убрав `when`, тогда кнопка будет во всех веб-вью, что тоже удобно).

#### 3. Файл `extension.js`
Логика переключения трех настроек одновременно.

```javascript
const vscode = require('vscode');

function activate(context) {
    const command = vscode.commands.registerCommand('toggleScrollSync.toggle', async () => {
        const config = vscode.workspace.getConfiguration();
        
        // Текущие значения (по умолчанию true, если не задано явно)
        const currentHtml = config.get('html.preview.scrollPreviewWithEditor', true);
        const currentHtmlReverse = config.get('html.preview.scrollEditorWithPreview', true);
        const currentMd = config.get('markdown.preview.scrollEditorWithPreview', true);

        // Инвертируем логику: если сейчас включено (true), ставим false, и наоборот
        const newValue = !currentHtml;

        await config.update('html.preview.scrollPreviewWithEditor', newValue, vscode.ConfigurationTarget.Global);
        await config.update('html.preview.scrollEditorWithPreview', newValue, vscode.ConfigurationTarget.Global);
        await config.update('markdown.preview.scrollEditorWithPreview', newValue, vscode.ConfigurationTarget.Global);

        const status = newValue ? 'OFF' : 'ON';
        vscode.window.showInformationMessage(`Scroll Sync is now ${status}`);
    });

    context.subscriptions.push(command);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
```

### Как установить и использовать

Так как вы предпочитаете готовые решения без лишней сложности, вот самый быстрый способ запустить это без публикации в маркетплейс:

1.  **Инициализация (если есть Node.js):**
    Откройте терминал в папке с этими двумя файлами:
    ```bash
    npm install
    # Если нет package.json, создайте пустой: npm init -y
    # Убедитесь, что в package.json есть "main": "./extension.js"
    ```

2.  **Запуск в режиме отладки (Рекомендуется для теста):**
    *   Откройте эту папку в VS Code.
    *   Нажмите `F5`. Откроется новое окно («Extension Development Host»).
    *   Откройте там HTML файл и запустите превью.
    *   Нажмите на **три точки** в углу превью — вы увидите пункт **Toggle Scroll Sync**.
    *   Проверьте работу.

3.  **Постоянная установка (Packaging):**
    Если тест прошел успешно, установите расширение глобально:
    *   Установите инструмент упаковки: `npm install -g @vscode/vsce`
    *   Соберите пакет: `vsce package` (создаст файл `.vsix`).
    *   Установите его в ваш основной VS Code:
        *   Откройте основной VS Code.
        *   Зайдите в раздел расширений (квадратики слева).
        *   Нажмите на три точки сверху -> **Install from VSIX...**
        *   Выберите созданный файл.

После установки кнопка появится во всех окнах превью (HTML и Markdown), позволяя мгновенно включать/выключать синхронизацию без захода в настройки.

**Нюанс с `webviewId`:**
Если кнопка не появляется, значит, ваше расширение превью использует нестандартный ID. Чтобы сделать кнопку видимой **всегда** в любом превью, измените секцию `menus` в `package.json` на более простую (убрав фильтр):

```json
    "menus": {
      "webview/title": [
        {
          "command": "toggleScrollSync.toggle",
          "group": "navigation"
        }
      ]
    }
```
Это добавит кнопку ко всем веб-панелям, что обычно безопасно и удобно для таких утилит.