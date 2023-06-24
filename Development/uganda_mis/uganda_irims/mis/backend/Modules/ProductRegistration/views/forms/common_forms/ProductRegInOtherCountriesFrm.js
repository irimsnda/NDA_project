/**
 * Created by Softclans
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductRegInOtherCountriesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productreginothercountriesfrm',
    controller: 'configurationsvctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_otherstates_productregistrations',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCountriesByStateRegions'
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Approving Authority',
            name: 'approving_authority'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Registration Date',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'date_of_registration',
            maxValue: new Date() 
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Registration Reference',
            name: 'registration_ref'
        },{
            xtype: 'textfield',
            fieldLabel: 'Current Registration Status(Active, Withdrawn etc)',
            name: 'current_registrationstatus'
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_otherstates_productregistrations',
                    storeID: 'productreginothercountriesStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});