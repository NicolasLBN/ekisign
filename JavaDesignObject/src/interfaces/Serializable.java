package interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface Serializable<T> {
    String serialize(List<T> object) throws JsonProcessingException;
    List<T> deserialize(String json) throws JsonProcessingException;
}
