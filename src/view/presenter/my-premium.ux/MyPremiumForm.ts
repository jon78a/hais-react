import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { PremiumFormValues } from "../../interactor/MyPremiumInteractor";

export interface MyPremiumFormUx {
  onFormSubmit: SubmitHandler<PremiumFormValues>;
  register: UseFormRegister<PremiumFormValues>;
  handleSubmit: UseFormHandleSubmit<PremiumFormValues>;
}
