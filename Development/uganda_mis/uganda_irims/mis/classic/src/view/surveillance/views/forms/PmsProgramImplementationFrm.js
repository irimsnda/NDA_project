/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.PmsProgramImplementationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pmsprogramimplementationfrm',
    layout: 'column',
    bodyPadding: 5,
    controller: 'surveillancevctr',
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
            value: 'pms_program_implementationplan'
        },
        {
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            xtype: 'hiddenfield',
            name: 'program_id'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Name of Program Plan Implementation',
            name: 'program_implementation'
        },{
            xtype: 'combo',
            fieldLabel: 'Year of Implementation',
            store:'year_store',
            displayField:'years',
            valueField:'years',
            name: 'year_of_implementation'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Implementation Start Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            name: 'implementationstart_date',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Implementation End Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            name: 'implementationend_date',
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
                '->',{
                    text: 'Save Details',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    handler: 'doSavePmsProgramImplementation',
                    storeID:'pmsprogramsimplementationtr',
                    action_url: 'surveillance/saveSurveillanceCommonData',
                    table_name: 'pms_program_details',
                    
                }
            ]
        }
    ]
});