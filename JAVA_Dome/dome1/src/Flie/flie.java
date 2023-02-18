package Flie;

import java.io.*;
import java.sql.Date;

public class flie {
    public static void main(String[] args) throws IOException {
        long t1 = System.currentTimeMillis();
        File fs = new File("D:\\视频下载\\JAVA");

//      FileInputStream 字节输入流对象  可用于读
        FileInputStream bis1 = new FileInputStream("D:\\文件\\文本素材.txt");
//      FileOutputStream 字节输出流对象  可用于写
        FileOutputStream bos1 = new FileOutputStream("写入数据.txt");

//      字节缓冲流读
        BufferedInputStream bis2 = new BufferedInputStream(new FileInputStream("D:\\文件\\文本素材.txt"));
//      字节缓冲流写
        BufferedOutputStream bos2 = new BufferedOutputStream(new FileOutputStream("写入数据.txt"));


//      字符流读数据
        InputStreamReader bis3 = new InputStreamReader(new FileInputStream("D:\\文件\\文本素材.txt"));
//      字符流写数据
        OutputStreamWriter bos3 = new OutputStreamWriter(new FileOutputStream("写入数据.txt"));

//        读取数据,采取字节缓冲 字符数组方式效率高
        int len1;
        while ((len1 = bis3.read()) != -1) {
            System.out.print((char) len1);
        }


//        读取数据,采取字节缓冲 字符数组方式效率高
        byte[] bys = new byte[1024];
        int len;
        while ((len = bis2.read(bys)) != -1) {
//          System.out.print((char) len);
//          写入数据
            bos2.write(bys, 0, len);
//            bos2.write(len);
        }

        bis1.close();
        bos1.close();
        bis2.close();
        bos2.close();
        bis3.close();
        bos3.close();

//        遍历查找文件
//        getAllFilePath(fs);
        long t2 = System.currentTimeMillis();
        System.out.println(t2 - t1);
    }

    public static void getAllFilePath(File fs) {
        File[] fileData = fs.listFiles();
        if (fileData != null) {
            for (File f : fileData) {
                if (f.isDirectory()) {
                    getAllFilePath(f);
                } else {
                    System.out.println(f.getName());
                }
            }
        }
    }
}
