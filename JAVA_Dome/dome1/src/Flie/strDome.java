package Flie;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

public class strDome {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String str = "中国";

//        编码
//        byte[] s = str.getBytes(StandardCharsets.UTF_8);
        byte[] s = str.getBytes("GBK");

//        解码
        String ss = new String(s,"GBK");
        System.out.println(ss);
    }
}
