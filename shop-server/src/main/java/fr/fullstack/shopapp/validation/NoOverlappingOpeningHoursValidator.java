package fr.fullstack.shopapp.validation;

import fr.fullstack.shopapp.model.OpeningHoursShop;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class NoOverlappingOpeningHoursValidator
        implements ConstraintValidator<NoOverlappingOpeningHours, List<OpeningHoursShop>> {

    @Override
    public boolean isValid(List<OpeningHoursShop> hours, ConstraintValidatorContext context) {

        if (hours == null || hours.isEmpty()) {
            return true;
        }

        for (int i = 0; i < hours.size(); i++) {
            OpeningHoursShop a = hours.get(i);

            if (a.getOpenAt() == null || a.getCloseAt() == null) {
                return false;
            }

            for (int j = i + 1; j < hours.size(); j++) {
                OpeningHoursShop b = hours.get(j);

                if (b.getOpenAt() == null || b.getCloseAt() == null) {
                    return false;
                }

                // même jour
                if (a.getDay() == b.getDay()) {

                    boolean overlap =
                            !(a.getCloseAt().isBefore(b.getOpenAt())
                                    || a.getOpenAt().isAfter(b.getCloseAt()));

                    if (overlap) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
