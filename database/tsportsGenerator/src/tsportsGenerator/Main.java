package tsportsGenerator;

import java.io.IOException;

public class Main {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		
		String currentDirectory = System.getProperty("user.dir") + "\\files\\";
		
		String userInputFile = currentDirectory + "users.csv";
		String sportsInputFile = currentDirectory + "sports.txt";
		String friendsInputFile = currentDirectory + "friends.csv";
		String interestsInputFile = currentDirectory + "interests.csv";
		String playSportInputFile = currentDirectory + "playSport.csv";
		String eventInputFile = currentDirectory + "event.csv";
		String locationInputFile = currentDirectory + "location.txt";
		
		String usersOutputFile = "users.dml";
		String sportsOutputFile = "sports.dml";
		String friendsOutputFile = "friends.dml";
		String interestsOutputFile = "interests.dml";
		String playSportOutputFile = "playSport.dml";
		String eventOutputFile = "event.dml";
		String locationOutputFile = "location.dml";
		
		Sports sp = new Sports();
		Users us = new Users();
		Friend friend = new Friend();
		Interest interest = new Interest();
		Event e = new Event();
		
		interest.readFile(interestsInputFile);
		interest.writeRecordToFile(interestsOutputFile);
		
		friend.readFile(friendsInputFile);
		friend.writeRecordToFile(friendsOutputFile);
		
		us.readUserFile(userInputFile);
		us.writeUserRecordToFile(usersOutputFile);
		
		us.readPlaySportFile(playSportInputFile);
		us.writePlaySportRecordToFile(playSportOutputFile);
		
		sp.readFile(sportsInputFile);
		sp.writeRecordToFile(sportsOutputFile);
		
		e.readFile(eventInputFile);
		e.writeRecordToFile(eventOutputFile);
		
		e.readLocationFile(locationInputFile);
		e.writeLocationRecordToFile(locationOutputFile);
	}

}
