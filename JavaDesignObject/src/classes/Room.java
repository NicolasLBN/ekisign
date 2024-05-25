package classes;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import interfaces.RoomInterface;
import java.time.LocalDateTime;

public class Room implements RoomInterface {

    private String name;
    private int id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime updatedAt;

    public Room() {
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public void setId(int id) {
        this.id = id;
    }

    @Override
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    @Override
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

    public static void main(String[] args) throws JsonProcessingException {
    String json = "{\"id\":13,\"name\":\"Room 1\",\"createdAt\":\"2024-05-25T11:12:58.071Z\",\"updatedAt\":\"2024-05-25T11:12:58.071Z\"}";

    System.out.println("json" + json);
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());

    // de-serialization
    try {
        Room room = objectMapper.readValue(json, Room.class);
        System.out.println(room);
    } catch (Exception e) {
        e.printStackTrace();
    }

    // serialization

//    Room room = new Room();
//    room.setId(13);
//    room.setName("Room 1");
//    room.setCreatedAt(LocalDateTime.parse("2024-05-25T11:12:58.071"));
//    room.setUpdatedAt(LocalDateTime.parse("2024-05-25T11:12:58.071"));

//    try {
//        String jsonString = objectMapper.writeValueAsString(room);
//        System.out.println(jsonString);
//    } catch (Exception e) {
//        e.printStackTrace();
//    }
}
    }

