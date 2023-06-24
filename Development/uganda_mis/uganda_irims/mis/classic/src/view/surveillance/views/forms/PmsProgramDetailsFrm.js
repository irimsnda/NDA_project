/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.PmsProgramDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pmsprogramdetailsfrm',
    layout: 'column',
    controller:'surveillancevctr',
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 2,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'pms_program_details'
        },
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Name/Identity',
            name: 'name'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Start Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            name: 'start_date',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'End Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            name: 'end_date',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Description',
            columnWidth: 1,
            name: 'description',
            allowBlank: true
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            height: 40,
            ui: 'footer',
            items: [
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    ui: 'soft-purple',
                    handler: function(btn){
                        var form=btn.up('form'),
                            addPnl=form.up('pmsprogramcontainer'),
                            homePnl=form.up('pmsprogrampnl'),
                            grid=homePnl.down('grid');
                        grid.getStore().load();
                        homePnl.remove(addPnl,true);
                        grid.show();
                    }
                },
                '->',
                {
                    text: 'Save Details',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    handler: 'doSavePmsProgramDetails',
                    action_url: 'surveillance/saveSurveillanceCommonData',
                    table_name: 'pms_program_details',
                    storeID: ''
                },{
					  text: 'Print PMS Prgram',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-print',
                    handler: 'doPrintPmsProgramDetails',
                   
				}
            ]
        }
    ]
});