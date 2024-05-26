package interfaces;

import java.time.LocalDateTime;

public interface RoomInterface {
    String getName();
    void setName(String name);
    int getId();
    void setId(int id);
    public LocalDateTime getCreatedAt();
    public void setCreatedAt(LocalDateTime createdAt);
    public LocalDateTime getUpdatedAt();
    public void setUpdatedAt(LocalDateTime updatedAt);
    public String toString();
}
