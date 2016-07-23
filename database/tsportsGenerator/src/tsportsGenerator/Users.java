package tsportsGenerator;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Users {

	private List<String> data;
	private List<String> playSport;
	
	Users()
	{
		this.data = new ArrayList<String>();
		this.playSport = new ArrayList<String>();
	}
	
	public void readPlaySportFile(String filePath) throws IOException
	{
		File f = new File(filePath);
		FileReader fr = new FileReader(f);
		BufferedReader bf = new BufferedReader(fr);
		String line;

		while ((line = bf.readLine()) != null)
		{
			System.out.println(line);
			playSport.add(line);
		}
		System.out.println();
		bf.close();
	}
	
	public void writePlaySportRecordToFile(String fileName) throws IOException
	{
		String currentDirectory = System.getProperty("user.dir");
		String path = currentDirectory + "\\DML\\"+ fileName;
		File f = new File(path);
		FileWriter fr = new FileWriter(f);
		BufferedWriter br = new BufferedWriter(fr);
		
		String query = 	"INSERT INTO PlaySport (sportid, userid, sumRating, totalNumOfRatings) \n" +
						"VALUES(%s, %s, %s, %s);";
		
		System.out.println("Starting to write to the file\n");
		
		br.write("SET search_path TO TSPORTS;\n");
		br.write("----------------------------------------- Play Sport ------------------------------------------------------------\n");
		for (int i = 1; i < this.playSport.size(); i++)
		{
			String data = this.playSport.get(i);
			System.out.printf("%s\n", data);
			String parts[] = data.split(",");
			br.write(String.format(query + "\n", parts[0], parts[1], parts[2], parts[3]));
		}
		
		br.flush();
		br.close();
		System.out.println("File Written\n");
	}

	
	public void readUserFile(String filePath) throws IOException
	{
		File f = new File(filePath);
		FileReader fr = new FileReader(f);
		BufferedReader bf = new BufferedReader(fr);
		String line;

		while ((line = bf.readLine()) != null)
		{
			System.out.println(line);
			data.add(line);
		}
		System.out.println();
		bf.close();
	}
	
	public void writeUserRecordToFile(String fileName) throws IOException
	{
		String currentDirectory = System.getProperty("user.dir");
		String path = currentDirectory + "\\DML\\"+ fileName;
		File f = new File(path);
		FileWriter fr = new FileWriter(f);
		BufferedWriter br = new BufferedWriter(fr);
		
		String query = 	"INSERT INTO Users (first_name, last_name, birthday, gender, height, weight, password, email, phone, createdAt, campus) \n" +
						"VALUES('%s', '%s', '%s'::date, '%s', %s, %s, '%s','%s', '%s', '%s'::timestamp, '%s');";
		
		System.out.println("Starting to write to the file\n");
		
		br.write("SET search_path TO TSPORTS;\n");
		br.write("----------------------------------------- Users ------------------------------------------------------------\n");

		for (int i = 1; i < this.data.size(); i++)
		{
			String data = this.data.get(i);
			System.out.printf("%s\n", data);
			String parts[] = data.split(",");
			br.write(String.format(query + "\n", 	parts[0], 
													parts[1], 
													parts[2],
													parts[3],
													parts[4],
													parts[5],
													parts[6],
													parts[7], 
													parts[8],
													parts[9],
													parts[10]));
		}
		
		br.flush();
		br.close();
		System.out.println("File Written\n");
	}

}
