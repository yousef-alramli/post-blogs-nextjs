'use client';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import Modal from 'react-modal';
import { object, string } from 'yup';
import styles from '../styles/actionsModal.module.scss';

Modal.setAppElement('#root');

const ActionsModal = ({ inputs = [], initialValues, title, isOpen, setOpen, onSubmit }) => {
  const [schemaShape, setSetSchemaShape] = useState({});

  useEffect(() => {
    const shape = {};

    inputs.forEach((input) => {
      shape[input.value] = string().required().min(2);
    });

    setSetSchemaShape(shape);
  }, [initialValues, inputs]);

  const schema = object().shape(schemaShape);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      style={{
        overlay: {
          backgroundColor: '#00000042'
        },
      }}
      contentLabel='Action Modal'
      className={styles.actionModal}
    >
      <h3 className={styles.title}>{title}</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errorMessage }) => (
          <div className={styles.inputsVontainer}>
            <div>
              {inputs.map((input) => (
                <div key={input.name}>
                  <label className={styles.contentLabel}>{input.name}</label>
                  <Field
                    className={styles.contentInput}
                    name={input.value}
                    type='text'
                    placeholder={input.name}
                    as={input.name !== 'Body' ? 'input' : 'textarea'}
                  />
                  <p className={styles.validationError}>
                    <ErrorMessage name={input.value} render={errorMessage} />
                  </p>
                </div>
              ))}
            </div>
            <button
              className={styles.submitButton}
              onClick={handleSubmit}
              type='submit'
            >
              Submit
            </button>
          </div>
        )}
      </Formik>
    </Modal>
  )
}

export default ActionsModal;
