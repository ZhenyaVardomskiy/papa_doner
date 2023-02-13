import { useState } from 'react'
import { Formik } from 'formik'
import { Box, Modal } from '@mui/material'
import { FaUserPlus } from 'react-icons/fa'
import * as Yup from 'yup'

import styles from './styles.module.scss'
import { FormInput } from 'shared/const/ui/FormInput'

const SignUpSchema = Yup.object().shape({
     name: Yup.string()
          .min(2, 'Слишком короткий!')
          .max(50, 'Слишком длинный!')
          .required('Обязательное поле'),
     lastName: Yup.string()
          .min(2, 'Слишком короткий!')
          .max(50, 'Слишком длинный!')
          .required('Обязательное поле'),
     email: Yup.string().email('Неверный адрес').required('Обязательное поле'),
     password: Yup.string()
          .min(2, 'Слишком короткий!')
          .max(50, 'Слишком длинный!')
          .required('Обязательное поле'),
     confirmPassword: Yup.string().oneOf(
          [Yup.ref('password')],
          'Пароли не совпадают'
     ),
})

function SignUpModal() {
     const [open, setOpen] = useState(false)

     function handleOpen() {
          setOpen(true)
     }

     function handleClose() {
          setOpen(false)
     }

     return (
          <div>
               <div className={styles.register} onClick={handleOpen}>
                    <FaUserPlus className={styles.registerIcon} />
                    Зарегистрироваться
               </div>
               <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
               >
                    <Box
                         sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              minWidth: 350,
                              bgcolor: 'background.paper',
                              boxShadow: 24,
                              borderRadius: 6,
                              p: 4,
                         }}
                    >
                         <Formik
                              initialValues={{
                                   name: '',
                                   lastName: '',
                                   email: '',
                                   password: '',
                                   confirmPassword: '',
                              }}
                              validationSchema={SignUpSchema}
                              onSubmit={(values) => {
                                   console.log(values)
                              }}
                         >
                              {({ handleSubmit }) => (
                                   <form
                                        onSubmit={handleSubmit}
                                        style={{
                                             display: 'flex',
                                             flexDirection: 'column',
                                             gap: '12px',
                                        }}
                                   >
                                        <div className={styles.title}>
                                             Зарегистрировать аккаунт Papa Doner
                                        </div>
                                        <FormInput name="name" label="Имя" />
                                        <FormInput
                                             name="lastName"
                                             label="Фамилия"
                                        />
                                        <FormInput name="email" />
                                        <FormInput
                                             name="password"
                                             label="Пароль"
                                        />
                                        <FormInput
                                             name="confirmPassword"
                                             label="Повторите пароль"
                                        />
                                        <button
                                             type="submit"
                                             className={styles.modalBtn}
                                        >
                                             Зарегистрироваться
                                        </button>
                                   </form>
                              )}
                         </Formik>
                    </Box>
               </Modal>
          </div>
     )
}

export default SignUpModal