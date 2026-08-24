import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsCorrectAnswerInAnswers(
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isCorrectAnswerInAnswers',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value, args: ValidationArguments) {
          const dto = args.object as any;
          const answers = dto.answers;

          return answers.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Значение поля "${args.property}" должно присутствовать в массиве "answers".`;
        },
      },
    });
  };
}
