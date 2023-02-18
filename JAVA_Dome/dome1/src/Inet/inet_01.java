package Inet;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class inet_01 {
    public static void main(String[] args) throws UnknownHostException {
        InetAddress address = InetAddress.getByName("192.168.160.1");
        System.out.println(address.getHostName());
        System.out.println(address.getHostAddress());
    }
}
