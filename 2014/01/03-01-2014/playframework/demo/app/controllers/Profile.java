package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Profile extends Controller {
    public static Result show(String id) {
        if(id.equals("0")) {
            return notFound(profileNotFound.render(id));
        } else {
            return ok(profile.render(id));
        }
    }
}
