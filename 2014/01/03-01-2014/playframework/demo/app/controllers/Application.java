package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result test() {
        return ok("Hello World");
    }

    public static Result superIndex() {
        return ok(superIndex.render("Super Index", "Que de contenu dans cette page"));
    }

}
