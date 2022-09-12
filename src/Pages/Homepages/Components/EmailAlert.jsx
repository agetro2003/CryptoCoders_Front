import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
    Button,
    Center
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPwSchema } from '../../../Utils/yupSchemas';
import API_AXIOS from '../../../../settings/settings';
import endpointList from '../../../../settings/endpoints';


function EmailAlert(props) {
    const { isOpen1: isOpen, onClose1: onClose } = props.val;
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(forgetPwSchema),
    });


    const fnSend = async (data) => {

        let { email } = data;
        let registeredFlag = await API_AXIOS.get(`${endpointList.findEmail}?email=${email}`);
        if (registeredFlag.data) {
            await API_AXIOS.post(`${endpointList.forgetPw}?email=${email}`)
            alert("Recibirá un correo para cambiar su contraseña");
        } else {
            alert("El correo no está registrado");
        }
        reset();

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalContent>
                <ModalHeader> Olvidé mi contraseña </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(fnSend)}>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel htmlFor="email"> Correo electrónico </FormLabel>
                            <Input id="email" placeholder="email" type="email" {...register("email")} />
                            <FormHelperText>Por favor ingrese su correo electrónico</FormHelperText>
                            <FormErrorMessage> {errors.email?.message}</FormErrorMessage>
                        </FormControl>
                        <Center>
                            <Button mt="2em" colorScheme="purple" type="submit">Enviar</Button>
                        </Center>
                    </form>

                </ModalBody>
                <ModalFooter>
                    <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


export default EmailAlert;
