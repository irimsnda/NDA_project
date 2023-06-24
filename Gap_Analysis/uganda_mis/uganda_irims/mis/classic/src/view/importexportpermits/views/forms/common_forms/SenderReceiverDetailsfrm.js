/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.SenderReceiverDetailsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'senderreceiverdetailsfrm',
    itemId: 'senderreceiverdetailsfrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top',
        
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'applicant_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'applicant_name',
                    readOnly: true,
                    bind: {
                        readOnly: '{isReadOnly}'
                    },
                    columnWidth: 0.9
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search Applicant',
                    action: 'link_applicant',
                    childXtype: 'senderreceiverselectiongrid',
                    winTitle: 'Sender/Receiver Information',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    winWidth: '90%'
                }
            ]
        },
       
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'app_country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            readOnly: true,
            displayField: 'name',
            bind: {
                readOnly: '{isReadOnly}'
            },
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'app_region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            readOnly: true,
            displayField: 'name',
            bind: {
                readOnly: '{isReadOnly}'
            },
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'app_district_id',
            readOnly: true,
            store: 'districtsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            bind: {
                readOnly: '{isReadOnly}'
            },
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            readOnly: true,
            bind: {
                readOnly: '{isReadOnly}'
            },
            name: 'app_physical_address'
        },
        {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'Postal Address',
            name: 'app_postal_address'
        },
        {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'Telephone',
            name: 'app_telephone'
        },
        
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            readOnly: true,
            name: 'app_email'
        }
    ]
});