export const SALT = 10;

export const MESSAGE_ERROR = {
  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',

  AUTH_USER: 'Неверный логин или пароль',

  FORBIDDEN: 'У вас не хватает прав. Автороризуйтесь',

  FORBIDDEN_UPDATE_WISH: 'Нельзя редактировать чужой подарок',

  BAD_REQUEST: 'Некорректно переданные данные',

  BAD_REQUEST_ID: 'Поле ID должно быть сгенерировано автоматически',

  BAD_REQUEST_UPDATE_ID: 'Нельзя обновить поле ID',

  NOT_FOUND_USER: 'Пользователь не найден',

  NOT_FOUND_WISH: 'Подарок не найден',

  ALREADY_EXISTS_USER: 'Пользователь уже существует',
};
