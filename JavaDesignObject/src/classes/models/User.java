package classes.models;

import interfaces.UserInterface;

public class User implements UserInterface {
    private String firstName;
    private String lastName;
    private int Id;

    @Override
    public String getFirstName() {
        return firstName;
    }
    @Override
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    @Override
    public String getLastName() {
        return lastName;
    }
    @Override
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    @Override
    public int getId() {
        return Id;
    }
    @Override
    public void setId(int Id) {
        this.Id = Id;
    }
}