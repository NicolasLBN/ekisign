package classes.models;

import classes.client.HTTPClient;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import interfaces.RoomInterface;
import interfaces.Serializable;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

public class Room implements RoomInterface, Serializable<Room> {

    private String name;
    private int id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private OffsetDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private OffsetDateTime updatedAt;

    public Room() {}

    public Room(String name, int id, OffsetDateTime  createdAt, OffsetDateTime updatedAt) {
        this.name = name;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
    public OffsetDateTime  getCreatedAt() {
        return createdAt;
    }

    @Override
    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public OffsetDateTime  getUpdatedAt() {
        return updatedAt;
    }

    @Override
    public void setUpdatedAt(OffsetDateTime updatedAt) {
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


    @Override
    public  List<Room> deserialize(String json) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, Room.class));
    }

    @Override
    public  String serialize(List<Room> rooms) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper.writeValueAsString(rooms);
    }

    public static void main(String[] args) throws JsonProcessingException {
    // serialization

//

//    try {
//        String jsonString = objectMapper.writeValueAsString(room);
//        System.out.println(jsonString);
//    } catch (Exception e) {
//        e.printStackTrace();
//    }
        }
    }

