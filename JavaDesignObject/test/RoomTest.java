import classes.client.HTTPClient;
import classes.models.Room;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RoomTest {

    String jsonResponse = "[{\"id\":13,\"name\":\"Room 1\",\"createdAt\":\"2024-05-25T11:12:58.071Z\",\"updatedAt\":\"2024-05-25T11:12:58.071Z\"}," +
            "{\"id\":14,\"name\":\"Room 7\",\"createdAt\":\"2024-05-26T06:47:01.693Z\",\"updatedAt\":\"2024-05-26T06:47:01.693Z\"}]";


    @Test
    public void testDeserializefromJson() throws JsonProcessingException {

        try {
            List<Room> rooms = Room.deserialize(jsonResponse);
            for (Room room : rooms) {
                System.out.println(room);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();

        }
    }

    public static List<String> flattenList(List<List<String>> nestedList) {
        List<String> flattenedList = new ArrayList<>();
        for (List<String> innerList : nestedList) {
            flattenedList.addAll(innerList);
        }
        return flattenedList;
    }


    @Test
    public void testDeserializefromHttpClientRequest() throws JsonProcessingException {
        HTTPClient client = new HTTPClient();
        List<String> responses = client.getResponses(new ArrayList<>(Arrays.asList("rooms")), 3000);

        System.out.println(responses);
        List<Room> rooms = new ArrayList<>();

        try {
            for (String res : responses) {
                List<Room> deserializedRooms  = Room.deserialize(res);
                rooms.addAll(deserializedRooms);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();

        }

        Assertions.assertEquals(2, rooms.size(), "Number of rooms should be 2");

        Room room1 = rooms.get(0);
        Assertions.assertEquals(13, room1.getId(), "First room ID should be 13");
        Assertions.assertEquals("Room 1", room1.getName(), "First room name should be 'Room 1'");
        Assertions.assertEquals(OffsetDateTime.parse("2024-05-25T11:12:58.071Z"), room1.getCreatedAt(), "First room createdAt should be '2024-05-25T11:12:58.071'");
        Assertions.assertEquals(OffsetDateTime.parse("2024-05-25T11:12:58.071Z"), room1.getUpdatedAt(), "First room updatedAt should be '2024-05-25T11:12:58.071'");

        Room room2 = rooms.get(1);
        Assertions.assertEquals(14, room2.getId(), "Second room ID should be 14");
        Assertions.assertEquals("Room 7", room2.getName(), "Second room name should be 'Room 7'");
        Assertions.assertEquals(OffsetDateTime.parse("2024-05-26T06:47:01.693Z"), room2.getCreatedAt(), "Second room createdAt should be '2024-05-26T06:47:01.693'");
        Assertions.assertEquals(OffsetDateTime.parse("2024-05-26T06:47:01.693Z"), room2.getUpdatedAt(), "Second room updatedAt should be '2024-05-26T06:47:01.693'");

    }

    @Test
    public void testSerializeToJson() throws JsonProcessingException {

        Room room1 = new Room("Room 8", 13, OffsetDateTime.now(), OffsetDateTime.now());
        Room room2 = new Room("Room 9", 15, OffsetDateTime.now(), OffsetDateTime.now());

        List<Room> rooms = Arrays.asList(room1, room2);

        try {
            String jsonString = Room.serialize(rooms);
            System.out.println(jsonString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}