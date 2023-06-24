/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.commoninterfaces.views.forms.MeetingDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'meetingdetailsfrm',
    layout: 'column',
    defaults: {
        labelAlign: 'top',
        columnWidth: 0.33,
        margin: 5,
        allowBlank: false
    },
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Meeting Description/Subject',
            name: 'meeting_name',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            }, margin: 0,
            defaults: {
                labelAlign: 'top',
                margin: 5,
                allowBlank: false
            },
            items:[{
                xtype: 'datefield',
                fieldLabel: 'Date Requested',labelAlign: 'top',
                name: 'date_requested',
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',width: '60%',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            },{
                xtype: 'timefield',
                fieldLabel:'Meeting Time',labelAlign: 'top',
                name: 'meeting_time',
                format: 'H:i',
                allowBlank:true,
                altFormats:'H:i',
                increment: 30,width: '40%',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            }]
        },{
            xtype: 'combo',
            name: 'meeting_type_id',
            fieldLabel: 'Meeting Type',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_meeting_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change:function(cbo, newValue){
                        var form = cbo.up('form');

                        if(newValue ==1){
                            form.down('textfield[name=meeting_venue]').setVisible(true);
                            form.down('textfield[name=meeting_invitation_details]').setVisible(false);
                        }else{
                            form.down('textfield[name=meeting_venue]').setVisible(false);
                            form.down('textfield[name=meeting_invitation_details]').setVisible(true);
                        }

                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Meeting Venue',
            columnWidth: 0.99,
            name: 'meeting_venue', allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Meeting Invitation Details(Copy & Paste the Meeting Invitation Details & link) ', columnWidth: 0.99,
            name: 'meeting_invitation_details',  hidden: true,
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Description',
            hidden: true,
            name: 'meeting_desc',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }]

});