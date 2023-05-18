import * as Yup from 'yup';
import messages from './validation-constants';

export const listeningAndReading = (skill: string) => {
  return skill === 'listening' || skill === 'reading';
};

export const objectUsingWhenPerField = {
  title: Yup.string().required(messages.title),
  content: Yup.string().required(messages.content),
  overview: Yup.string().when('skill', {
    is: 'reading',
    then: (schema) => schema.required(messages.overview),
    otherwise: (schema) => schema.notRequired(),
  }),
  record: Yup.mixed().when('skill', {
    is: 'listening',
    then: (schema) => schema.required(messages.record),
    otherwise: (schema) => schema.notRequired(),
  }),
  answers: Yup.array().when(['skill'], {
    is: (skill: string) => listeningAndReading(skill),
    then: (schema) =>
      schema.of(
        Yup.object({
          index: Yup.string().required(messages.key),
          value: Yup.string().required(messages.title),
          point: Yup.number().required(messages.point),
        })
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
  configAnswerCheckBoxs: Yup.array().when(['skill'], {
    is: (skill: string) => {
      return listeningAndReading(skill);
    },
    then: (schema) =>
      schema.of(
        Yup.object({
          checkBoxs: Yup.array().of(
            Yup.object({
              value: Yup.string().required(messages.title),
            })
          ),
          index: Yup.string().required(messages.key),
        })
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
};
