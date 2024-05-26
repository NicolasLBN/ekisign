package classes.models;

import interfaces.DeviceInterface;

public class Device implements DeviceInterface {
    private String name;
    private String type;
    private boolean isOccuped;
    private String ipAddress;
    private int id;
    private static int lastIpAddressField = 0;

    public Device() throws Exception {
        this.ipAddress = generateNextIpAddress();
    }

    private String generateNextIpAddress() throws Exception {
        String newIpAddress;
        lastIpAddressField++;
        return "192.168.0." + lastIpAddressField;
    }
    @Override
    public String getType() {
        return type;
    }
    @Override
    public void setType(String type) {
        this.type = type;
    }
    @Override
    public boolean getIsOccuped() {
        return isOccuped;
    }
    @Override
    public void setIsOccuped(boolean isOccupied) {
        this.isOccuped = isOccupied;
    }
    @Override
    public String getName() {
        return name;
    }
    @Override
    public void setName(String type) {
        this.name = type;
    }
    @Override
    public String getIpAddress() {
        return ipAddress;
    }
    @Override
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    @Override
    public int getId() {
        return id;
    }
    @Override
    public void setId(int id) {
        this.id = id;
    }

}
