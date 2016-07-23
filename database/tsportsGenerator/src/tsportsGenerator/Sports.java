package tsportsGenerator;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class Sports {
	
	private List<String> sports;

	public Sports() {

		this.sports = new ArrayList<String>();;
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
			sports.add(line);
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
		
		String query = "INSERT INTO Sports (name) VALUES('%s');";
		System.out.println("Starting to write to the file\n");
		br.write("SET search_path TO TSPORTS;\n");
		br.write("----------------------------------------- Sports ------------------------------------------------------------\n");

		for(String sport: this.sports)
		{	
			System.out.printf("%s\n", sport);
			br.write(String.format(query + "\n", sport));
		}
		
		br.flush();
		br.close();
		System.out.println("File Written\n");
	}

}
