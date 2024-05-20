package classes;
import interfaces.RoomInterface;

public class Room implements RoomInterface{

    private String name;
    private int benchCapacity;
    @Override
    public String getName() {
        return name;
    }
    @Override
    public void setName(String name) {
        this.name = name;
    }
    @Override
    public int getBenchCapacity() {
        return benchCapacity;
    }
    @Override
    public void setBenchCapacity(int benchCapacity) {
        this.benchCapacity = benchCapacity;
    }
}