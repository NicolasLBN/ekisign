package classes.client;

import interfaces.Serializable;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class HTTPClient {


    public HTTPClient() {}

    // Fonction générique pour obtenir la réponse d'une requête HTTP GET
    public static String getHttpResponse(String object, int port) throws Exception {
        // Créer l'objet URL
        String strUrl = "http://localhost:" + Integer.toString(port) +"/" + object;
        URL url = new URL(strUrl);

        // Ouvrir la connexion
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        // Définir la méthode de la requête (GET)
        con.setRequestMethod("GET");

        // Obtenir le code de réponse
        int responseCode = con.getResponseCode();
        System.out.println("Response Code: " + responseCode);

        // Lire la réponse
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        // Retourner la réponse sous forme de chaîne de caractères
        return response.toString();
    }

    public List<String> getResponses(List<String> pathList, int port) {
        List<String> responses = new ArrayList<>();
        pathList.forEach(path -> {
            try {
                String response = getHttpResponse(path, port);
                responses.add(response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        return responses;
    }

    public static <T extends Serializable<T>> void putHttpResponse(T object, List<T> objects, String endpoint, int port) throws Exception {
        // Utiliser la méthode serialize de l'objet
        String jsonObject = object.serialize(objects);

        // Create the URL object
        String strUrl = "http://localhost:" + port + "/" + endpoint;
        URL url = new URL(strUrl);

        // Open the connection
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        // Set the request method to PUT
        con.setRequestMethod("PUT");
        con.setRequestProperty("Content-Type", "application/json; utf-8");
        con.setDoOutput(true);

        // Write the JSON to the output stream
        try (OutputStream os = con.getOutputStream()) {
            byte[] input = jsonObject.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Get the response code
        int responseCode = con.getResponseCode();
        System.out.println("PUT Response Code: " + responseCode);

        if (responseCode == HttpURLConnection.HTTP_OK || responseCode == HttpURLConnection.HTTP_NO_CONTENT) {
            System.out.println("PUT request successful.");
        } else {
            System.out.println("PUT request failed.");
        }
    }

    public static void main(String[] args) throws Exception {
        HTTPClient client = new HTTPClient();
        String response = client.getHttpResponse("rooms", 3000);
        System.out.println("Response user: " + response);
        List<String> responses = client.getResponses(new ArrayList<>(Arrays.asList("rooms")), 3000);
        System.out.println("Responses: " + responses);
    }

}


