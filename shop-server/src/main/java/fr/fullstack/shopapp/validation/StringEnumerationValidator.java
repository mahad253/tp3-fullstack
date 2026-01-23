package fr.fullstack.shopapp.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class StringEnumerationValidator
        implements ConstraintValidator<StringEnumeration, String> {

    private Set<String> availableEnumNames;

    public static Set<String> getNamesSet(Class<? extends Enum<?>> e) {
        Enum<?>[] enums = e.getEnumConstants();
        String[] names = new String[enums.length];

        for (int i = 0; i < enums.length; i++) {
            names[i] = enums[i].name();
        }

        return new HashSet<>(Arrays.asList(names));
    }

    @Override
    public void initialize(StringEnumeration stringEnumeration) {
        Class<? extends Enum<?>> enumSelected = stringEnumeration.enumClass();
        availableEnumNames = getNamesSet(enumSelected);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        return availableEnumNames.contains(value);
    }
}
