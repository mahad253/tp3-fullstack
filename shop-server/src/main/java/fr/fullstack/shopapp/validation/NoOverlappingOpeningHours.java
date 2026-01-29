package fr.fullstack.shopapp.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = NoOverlappingOpeningHoursValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface NoOverlappingOpeningHours {

    String message() default "Chevauchement d’horaires détecté";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
