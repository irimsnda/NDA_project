/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrgcIpinspectionSelectionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrgcpinspectionselectionfrm',
    itemId:'ctrgcpinspectionselectionfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        margin: 3
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'registered_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'inspection_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },{
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textarea',
                    fieldLabel:'Study Title',
                    readOnly: true,
                    columnWidth: 0.9,
                    name:'study_title',
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                   
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_clinicaltrial',
                    childXtype: 'gcpclinicaltrialsselectiongrid',
                    winTitle: 'Clinical Trial Selection',
                    winWidth: '80%',
                    margin: '30 0 0 0'
                }
            ]
        },
        {
            xtype: 'tagfield',
            name: 'study_sites_id',
            fieldLabel: 'Study Site',
            margin: '0 20 20 0',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Select Study Sites',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        storeId:'clinicalStudySitesStr',
                        proxy: {
                            url: 'clinicaltrial/getClinicalStudySites'
                        }
                    },
                    isLoad: false
                }, afterrender: function () {
                    var form = this.up('form'),
                        application_id = form.down('hiddenfield[name=application_id]').getValue(),
                        store = this.getStore();
                    store.removeAll();
                    store.load({params: {application_id: application_id}});
                }
              
            }
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            formBind: true,
            storeID: 'ctrgcpinspectionschedulegridstr',
            name: 'btn_savegcpapplication'
        }
    ]
});