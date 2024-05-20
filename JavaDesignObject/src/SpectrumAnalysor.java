import classes.Device;

public class SpectrumAnalysor extends Device {
    // Vous pouvez ajouter des méthodes ou des attributs spécifiques ici si nécessaire
    private int channelNumber;

    public SpectrumAnalysor() throws Exception {
        super();
    }

    public int getChannelNumber() {
        return channelNumber;
    }

    public void setChannelNumber(int channelNumber) {
        this.channelNumber = channelNumber;
    }

}
