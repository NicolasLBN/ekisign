import classes.client.HTTPClient;
import classes.models.Room;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;

import java.time.LocalDateTime;
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

    @Test
    public void testDeserializefromHttpClientRequest() throws JsonProcessingException {
            HTTPClient client = new HTTPClient();
            List<String> responses = client.getResponses(List.of("rooms"), 3000);

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());

            List<Room> rooms = null;
            for (String response : responses) {
                rooms = objectMapper.readValue(response, new TypeReference<List<Room>>() {
                });
                rooms.forEach(System.out::println);
            }

            Assertions.assertEquals(2, rooms.size(), "Number of rooms should be 2");

            Room room1 = rooms.get(0);
            Assertions.assertEquals(13, room1.getId(), "First room ID should be 13");
            Assertions.assertEquals("Room 1", room1.getName(), "First room name should be 'Room 1'");
            Assertions.assertEquals(LocalDateTime.parse("2024-05-25T11:12:58.071"), room1.getCreatedAt(), "First room createdAt should be '2024-05-25T11:12:58.071'");
            Assertions.assertEquals(LocalDateTime.parse("2024-05-25T11:12:58.071"), room1.getUpdatedAt(), "First room updatedAt should be '2024-05-25T11:12:58.071'");

            Room room2 = rooms.get(1);
            Assertions.assertEquals(14, room2.getId(), "Second room ID should be 14");
            Assertions.assertEquals("Room 7", room2.getName(), "Second room name should be 'Room 7'");
            Assertions.assertEquals(LocalDateTime.parse("2024-05-26T06:47:01.693"), room2.getCreatedAt(), "Second room createdAt should be '2024-05-26T06:47:01.693'");
            Assertions.assertEquals(LocalDateTime.parse("2024-05-26T06:47:01.693"), room2.getUpdatedAt(), "Second room updatedAt should be '2024-05-26T06:47:01.693'");

        }
}