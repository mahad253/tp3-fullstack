package fr.fullstack.shopapp.validation;

import fr.fullstack.shopapp.model.OpeningHoursShop;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalTime;
import java.util.List;

public class NoOverlappingOpeningHoursValidator
        implements ConstraintValidator<NoOverlappingOpeningHours, List<OpeningHoursShop>> {

    @Override
    public boolean isValid(List<OpeningHoursShop> hours, ConstraintValidatorContext context) {

        if (hours == null || hours.size() <= 1) {
            return true;
        }

        for (int i = 0; i < hours.size(); i++) {
            OpeningHoursShop a = hours.get(i);

            for (int j = i + 1; j < hours.size(); j++) {
                OpeningHoursShop b = hours.get(j);

                // même jour ?
                if (a.getDay() == b.getDay()) {

                    LocalTime startA = a.getOpenAt();
                    LocalTime endA = a.getCloseAt();

                    LocalTime startB = b.getOpenAt();
                    LocalTime endB = b.getCloseAt();

                    // chevauchement ?
                    boolean overlap =
                            startA.isBefore(endB) &&
                                    startB.isBefore(endA);

                    if (overlap) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
