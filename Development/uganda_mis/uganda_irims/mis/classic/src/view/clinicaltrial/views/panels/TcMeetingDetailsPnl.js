/**
 * Created by Kip on 1/27/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.TcMeetingDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'tcmeetingdetailspnl',
    controller: 'clinicaltrialvctr',
    frame: true,
    height: 400,
    layout:{
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'meetingDetailsFrm',
            flex: 0.3
        },
        {
            xtype: 'tcmeetingparticipantsgrid',
            flex: 0.7,
            listeners: {
                afterrender: function(){
                    var store=this.getStore();
                    store.removeAll();
                    store.load();
                }
            }
        }
    ]
});