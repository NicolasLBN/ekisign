package interfaces;

public interface DeviceInterface {
    String getName();
    void setName(String name);

    int getId();
    void setId(int Id);

    String getType();
    void setType(String type);

    boolean getIsOccuped();
    void setIsOccuped(boolean isOccuped);

    String getIpAddress();
    void setIpAddress(String ipAddress);

}
