/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.PmsProgramRegionsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pmsprogramregionsfrm',
    controller: 'surveillancevctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        labelAlign: 'top',
        columnWidth: 1
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'program_id'
        },
       
        {
            xtype: 'tagfield',
            fieldLabel: 'Select Region',
            margin: '0 20 20 0',
            store: 'regionsstr',
            name: 'region_ids',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Select Regions',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.getStore();
                    store.removeAll();
                    filter = {
                            country_id: 36
                        };
                    filter = JSON.stringify(filter);
                    store.load({params:{filter:filter}});
                }
            }
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            handler: 'doCreateSurveillanceParamWin',
            action_url: 'surveillance/savePmsProgramRegions',
            table_name: 'pms_program_regions',
            storeID: 'pmsprogramregionsstr',
        }
    ]
});