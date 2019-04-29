package com.learnrn;
import android.app.Activity;
import android.widget.Toast;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;
import android.os.Bundle;
import android.provider.ContactsContract;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import static android.app.Activity.RESULT_OK;

public class ExampleInterface extends ReactContextBaseJavaModule{
    ReactApplicationContext aContext;
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener(){
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data){
            if(requestCode != 1 || resultCode != RESULT_OK){
                return;
            }
            Uri contactData = data.getData();
            Cursor cursor = activity.managedQuery(contactData, null, null, null, null);
            cursor.moveToFirst();
            String toRNMessage = getContactInfo(cursor);    //取得结果字符串
            sendMessage(toRNMessage);     //交接口发送
        }
    };     //私有成员变量mActivityEventListener定义结束
    public ExampleInterface(ReactApplicationContext reactContext){
        super(reactContext);
        aContext = reactContext;    //保存MainActivity传来的上下文实例
        reactContext.addActivityEventListener(mActivityEventListener);    //让私有成员变量mActivityEventListener监听ActivityResult
    }
    @Override
    public String getName(){
        return "ExampleInterface";
    }
    @ReactMethod
    public void HandleMessage(String aMessage){
        Toast.makeText(getReactApplicationContext(), aMessage, 2000).show();
        Intent aIntent = new Intent(Intent.ACTION_PICK);
        aIntent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        Bundle b = new Bundle();    //这个Bundle没有用，但必须要有
        aContext.startActivityForResult(aIntent, 1, b);    //调用系统提供的选择联系人界面
    }
    public void sendMessage(String aMessage){     //此函数用来向React Native侧发送消息
        aContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", aMessage);
    }
    //getContactInfo函数取出用户选择的联系人的姓名与电话号码，按某规则生成结果字符串
    private String getContactInfo(Cursor cursor){
        String name = "";
        String phoneNumber = "";
        int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
        String contactId = cursor.getString(idColumn);
        String queryString = ContactsContract.CommonDataKinds.Phone.CONTACT_ID + "=" + contactId;
        Uri aUri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI;
        Cursor phone = aContext.getContentResolver().query(aUri, null, queryString, null, null);
        String dn = ContactsContract.Contacts.DISPLAY_NAME;
        String pn = ContactsContract.CommonDataKinds.Phone.NUMBER;
        if(phone.moveToFirst()){
            for(; !phone.isAfterLast(); phone.moveToNext()){
                dn = name = cursor.getString(cursor.getColumnIndex(dn));
                phoneNumber = phone.getString(phone.getColumnIndex(pn));
            }
            phone.close();
        }
        String result = "{ \"msgType\":\"pickContactResult\", \"displayName\":\"" + name + "\", \"peerNumber\":\"" + phoneNumber + "\" }";
        return result;
    }

}
