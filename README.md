## Задание на вёрстку

Это задание проверяет, насколько хорошо вы умеете верстать и знаете особенности браузеров.

Вам нужно сверстать панель управления «умным домом». Она показывает информацию о текущем состоянии дома и позволяет управлять устройствами вручную и по сценариям. Дизайнер подготовил для вас отдельные макеты для большого экрана и мобильных телефонов.

**Ссылки**

- [Макеты](https://yandex-shri-2018.github.io/entrance-task-2-2/guide/)
- [Пример анимации открытия попапа](https://yandex-shri-2018.github.io/entrance-task-2-2/Animation.mp4)
- [Репозиторий на GitHub](https://github.com/yandex-shri-2018/entrance-task-2-2)

### Компоновка страницы

- В верхней части страницы есть шапка. В ней находится логотип и главное меню. Для адресов ссылок используйте заглушку #.

- В нижней части находится подвал. Он должен примыкать к нижней границе экрана, вне зависимости от количества контента на странице.

- Вертикальный скролл есть только в мобильной версии, при прокрутке шапка остаётся на месте. Главное меню прячется за иконку ☰.

### Содержимое страницы

На странице отображаются три блока:

- «Главное»,
- «Избранные сценарии»,
- «Избранные устройства».

### Главное

- Блок «Главное» находится слева и занимает половину экрана. В нём в виде текста отображается состояние окон и дверей, температура в доме и на улице. Справа находится список ближайших запланированных сценариев, который можно листать по вертикали. На мобильных устройствах блок занимает всю ширину экрана, а список ближайших сценариев листается по горизонтали.
- Избранные сценарии:
  - Правую половину экрана занимает блок «Избранные сценарии». Сами сценарии отображаются в виде панелей фиксированного размера, которые расположены в три ряда.
  - Цвет иконки показывает, активен ли сценарий сейчас.
- Если все сценарии не помещаются в три ряда, то справа сверху появляются кнопки для постраничного листания.
- Переход между страницами должен быть анимированным. Вид и параметры анимации выберите самостоятельно.

### Избранные устройства

- Устройства, как и сценарии, отображаются в виде панелей фиксированного размера. Они расположены в один ряд по всей ширине экрана. Если устройства не помещаются, справа над списком появляются кнопки для постраничного листания — как в списке сценариев. На мобильных устройствах вместо постраничного листания используется горизонтальная прокрутка списка.
- Список устройств можно фильтровать по комнатам и типам устройств. В мобильной версии фильтр отображается в виде меню. Для меню нет макета — реализуйте его на свое усмотрение.
- При клике на устройство должен открываться попап управления им. Открытие попапа должно сопровождаться анимацией. Пример анимации есть в репозитории с макетами.
- Яркость ламп и температура теплого пола выбираются при помощи слайдера. Термостатом можно управлять при помощи крутилки.

### Критерии

- В первую очередь мы будем проверять, свёрстаны ли страницы в точном соответствии с макетами. Если какие-то части макетов покажутся вам непонятными, обязательно задавайте уточняющие вопросы — пишите на адрес frontendschool@yandex-team.ru.
- Вёрстка должна корректно выглядеть:
  - На десктопе — в последних версиях Google Chrome, Яндекс.Браузера, Mozilla Firefox, Safari, Microsoft Edge.
  - На мобильных устройствах — в Safari (iOS) и Google Chrome (Android).
- В этом задании мы проверяем ваши навыки вёрстки. Вы можете использовать JavaScript, если посчитаете это нужным, но старайтесь, чтобы код был как можно проще. Пожалуйста, не используйте JavaScript-фреймворки.
- По возможности используйте приёмы безопасной деградации CSS.
- Уделите внимание организации и оформлению кода. Оптимизация производительности и автоматизация будут плюсом.

## Выполнение задания

### 1. Настройка окружения

Исходя из цели задачи: "Проверка, умения верстать и знание особенностей браузеров", я решил использовать сборщик [**Gulp**](https://gulpjs.com/), для сборки проекта, оптимизации рутинных задач, а так же запуска Dev-сервера. Так как раньше я с ним уже работал, он прост в конфигурации, а так же не предвидится писать много JS для сборки его в отдельный `bundle`.

В реализации данного задания используются следующие плагины:

- [browser-sync](https://www.npmjs.com/package/browser-sync) - для запуска Dev-сервера и Live-reload.
- [gulp-sass](https://www.npmjs.com/package/gulp-sass) - для компиляции препроцессора SASS в CSS
- [gulp-csso](https://www.npmjs.com/package/gulp-csso) - минификация CSS
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - минификация изображений и SVG
- [gulp-newer](https://www.npmjs.com/package/gulp-newer) - для копирования новых файлов в билд при разработке
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - автоматическое добавление вендорных префиксов к CSS
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - дает возможность продолжить работу gulp при ошибке в коде.
- [gulp-clean](https://github.com/peter-vilja/gulp-clean) - очистка директории билда перед сборкой.
- [gulp-rename](https://www.npmjs.com/package/gulp-rename) - для переименования файлов, добавления суффикса `.min` к сжатым файлам.
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - минификация js.

Так же установил дополнительно пакеты [`husky`](https://www.npmjs.com/package/husky), [`lint-staged`](https://www.npmjs.com/package/lint-staged) и [`Prettier`](https://www.npmjs.com/package/prettier) для реализации автоматизированного приведения к единому стилю с помощью запуска `Prettier` в `precommit hook`.

### 2. Верстка

Не нашел спрайтов для `favicon`, поэтому сам нарисовал подобный в `Adobe Photoshop`
