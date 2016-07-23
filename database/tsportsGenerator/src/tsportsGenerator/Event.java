package tsportsGenerator;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Event {
	private List<String> event;
	private List<String> location;
	Event()
	{
		event = new ArrayList<String>();
		location = new ArrayList<String>();
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
			this.event.add(line);
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
		
		String query = 	"INSERT INTO Event (name, location, max_Number_Of_Players, attending, time) \n" +
						"VALUES('%s', %s, %s, %s, '%s'::Date);";
		
		System.out.println("Starting to write to the file");
		br.write("SET search_path TO TSPORTS;\n");
		br.write("----------------------------------------- Event ------------------------------------------------------------\n");

		for (int i = 1; i < this.event.size(); i++)
		{
			String data = this.event.get(i);
			System.out.printf("%s\n", data);
			String parts[] = data.split(",");
			
			br.write(String.format(query + "\n", parts[0],	parts[1], parts[2], parts[3], parts[4]));
		}
		
		br.flush();
		br.close();
		System.out.println("File Written");
	}
	
	public void readLocationFile(String filePath) throws IOException
	{
		File f = new File(filePath);
		FileReader fr = new FileReader(f);
		BufferedReader bf = new BufferedReader(fr);
		String line;

		while ((line = bf.readLine()) != null)
		{
			System.out.println(line);
			this.location.add(line);
		}
		System.out.println();
		bf.close();
	}
	
	
	public void writeLocationRecordToFile(String fileName) throws IOException
	{
		String currentDirectory = System.getProperty("user.dir");
		String path = currentDirectory + "\\DML\\"+ fileName;
		File f = new File(path);
		FileWriter fr = new FileWriter(f);
		BufferedWriter br = new BufferedWriter(fr);
		
		String query = 	"INSERT INTO Location (name) \n" +
						"VALUES('%s');";
		
		System.out.println("Starting to write to the file");
		br.write("SET search_path TO TSPORTS;\n");
		br.write("----------------------------------------- Location ------------------------------------------------------------\n");

		for (int i = 0; i < this.location.size(); i++)
		{
			String data = this.location.get(i);
			System.out.printf("%s\n", data);
			
			
			br.write(String.format(query + "\n", data));
		}
		
		br.flush();
		br.close();
		System.out.println("File Written");
	}
}
