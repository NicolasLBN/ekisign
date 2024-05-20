package classes;

import interfaces.BenchInterface;

public class Bench implements BenchInterface {
    private String name;
    private boolean isOccuped;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean getIsOccuped() {
        return isOccuped;
    }

    @Override
    public void setisOccuped(boolean isOccuped) {
        this.isOccuped = isOccuped;
    }


}