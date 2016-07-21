package tsportsGenerator;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Interest {
	private List<String> interests;
	
	Interest()
	{
		this.interests = new ArrayList<String>();
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
			this.interests.add(line);
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
		
		String query = 	"INSERT INTO Interests (userid, sportid) \n" +
						"VALUES(%s, %s);";
		
		System.out.println("Starting to write to the file");
		br.write("SET search_path TO TSPORTS;\n");
		br.write("----------------------------------------- Interests ------------------------------------------------------------\n");

		
		for (int i = 1; i < this.interests.size(); i++)
		{
			String data = this.interests.get(i);
			System.out.printf("%s\n", data);
			String parts[] = data.split(",");
			
			br.write(String.format(query + "\n", parts[0],	parts[1]));
		}
		
		br.flush();
		br.close();
		System.out.println("File Written\n");
	}
}
