package classes.client;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

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

    public static void main(String[] args) throws Exception {
        HTTPClient client = new HTTPClient();
        String response = client.getHttpResponse("rooms", 3000);
        System.out.println("Response user: " + response);
        List<String> responses = client.getResponses(new ArrayList<>(Arrays.asList("rooms")), 3000);
        System.out.println("Responses: " + responses);
    }

}


