package interfaces;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

public interface RoomInterface {
    String getName();
    void setName(String name);
    int getId();
    void setId(int id);
    public OffsetDateTime  getCreatedAt();
    public void setCreatedAt(OffsetDateTime  createdAt);
    public OffsetDateTime getUpdatedAt();
    public void setUpdatedAt(OffsetDateTime  updatedAt);
    public String toString();
}
