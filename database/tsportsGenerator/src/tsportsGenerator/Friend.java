package tsportsGenerator;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Friend {
	private List<String> friend_requests;
	private List<String> updates_friend;
	private final static String[] STATUS = {"Pending Friend Request", "Confirmed Friend Request"};
	
	Friend()
	{
		this.friend_requests = new ArrayList<String>();
		this.updates_friend = new ArrayList<String>();
	}
	
	public void readFile(String filePath) throws IOException
	{
		File f = new File(filePath);
		FileReader fr = new FileReader(f);
		BufferedReader bf = new BufferedReader(fr);
		String line;

		while ((line = bf.readLine()) != null)
		{
			System.out.println(line);
			friend_requests.add(line);
		}
		System.out.println();
		bf.close();
	}
	
	public void writeRecordToFile(String fileName) throws IOException
	{
		String currentDirectory = System.getProperty("user.dir");
		String path = currentDirectory + "\\DML\\"+ fileName;
		File f = new File(path);
		FileWriter fr = new FileWriter(f);
		BufferedWriter br = new BufferedWriter(fr);
		
		String query = 	"INSERT INTO Friends (friend_one, friend_two, status) \n" +
						"VALUES(%s, %s, %s);";
		
		System.out.println("Starting to write to the file");
		
		br.write("SET search_path TO TSPORTS;\n");
		br.write("-------------- Friends --------------\n\n");
		
		for (int i = 1; i < this.friend_requests.size(); i++)
		{
			String data = this.friend_requests.get(i);
			System.out.printf("%s\n", data);
			String parts[] = data.split(",");
			String friend_one = parts[0], 
				   friend_two = parts[1], 
				   status = parts[2];
			
			if (!parts[3].equals("false"))
			{
				br.write(String.format(query + "\n", friend_one, friend_two, status));
				insertUpdateFriend(status, friend_one);
			}
		}
		
		br.write("\n\n-------------- Update Friends --------------\n\n");
		
		for (String update: this.updates_friend)
		{
			br.write(update);
		}
		
		br.flush();
		br.close();
		System.out.println("File Written\n");
	}
	
	public void insertUpdateFriend(String status, String userid)
	{
		String query = 	"INSERT INTO Update_Friends (update_status, userid) \n" +
				"VALUES('%s', %s);\n";
		
		if(status.equals("1"))
		{
			updates_friend.add(String.format(query, STATUS[0], userid));
			updates_friend.add(String.format(query, STATUS[1], userid));
		}
		
		if (status.equals("0"))
		{
			updates_friend.add(String.format(query, STATUS[0], userid));
		}
	}	
}
