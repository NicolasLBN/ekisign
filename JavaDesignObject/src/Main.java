import classes.Device;

public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello world!");
        Device oscilloscope1 = new Device();
        System.out.println("Oscilloscope IP: " + oscilloscope1.getIpAddress());
        Device oscilloscope2 = new Device();
        System.out.println("Oscilloscope IP: " + oscilloscope2.getIpAddress());








    }
}